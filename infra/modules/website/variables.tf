variable "name_prefix" {
  description = "Prefix used for the S3 bucket name and resource descriptions."
  type        = string
}

variable "frontend_dir" {
  description = "Local directory whose files are uploaded to the site bucket, keeping their relative paths as object keys."
  type        = string
}
