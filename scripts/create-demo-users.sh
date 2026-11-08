#!/usr/bin/env bash
# Creates one demo Cognito user per role: demo-admin, demo-driver, demo-member.
#
# Usage:
#   DEMO_PASSWORD='<password>' ./scripts/create-demo-users.sh <user-pool-id>
#
# Region comes from AWS_REGION, otherwise ca-central-1.
# Safe to rerun: existing users are skipped, but their password and group are still set.
# The pool uses plain usernames with no required attributes, so no email is set.
set -euo pipefail

USER_POOL_ID="${1:-}"
REGION="${AWS_REGION:-ca-central-1}"

if [ -z "$USER_POOL_ID" ]; then
  echo "Error: missing user pool ID." >&2
  echo "Usage: DEMO_PASSWORD='<password>' $0 <user-pool-id>" >&2
  exit 1
fi

if [ -z "${DEMO_PASSWORD:-}" ]; then
  echo "Error: DEMO_PASSWORD environment variable is not set." >&2
  echo "Usage: DEMO_PASSWORD='<password>' $0 <user-pool-id>" >&2
  exit 1
fi

# username:group
USERS=(
  "demo-admin:admin"
  "demo-driver:driver"
  "demo-member:member"
)

for entry in "${USERS[@]}"; do
  username="${entry%%:*}"
  group="${entry##*:}"

  if aws cognito-idp admin-get-user \
      --region "$REGION" \
      --user-pool-id "$USER_POOL_ID" \
      --username "$username" >/dev/null 2>&1; then
    echo "$username already exists, skipping create"
  else
    echo "Creating $username"
    aws cognito-idp admin-create-user \
      --region "$REGION" \
      --user-pool-id "$USER_POOL_ID" \
      --username "$username" \
      --message-action SUPPRESS >/dev/null
  fi

  # --permanent so login does not hit NEW_PASSWORD_REQUIRED
  aws cognito-idp admin-set-user-password \
    --region "$REGION" \
    --user-pool-id "$USER_POOL_ID" \
    --username "$username" \
    --password "$DEMO_PASSWORD" \
    --permanent

  # adding a user to a group they're already in is a no-op
  aws cognito-idp admin-add-user-to-group \
    --region "$REGION" \
    --user-pool-id "$USER_POOL_ID" \
    --username "$username" \
    --group-name "$group"

  echo "$username -> group $group, password set"
done

echo "Done."
