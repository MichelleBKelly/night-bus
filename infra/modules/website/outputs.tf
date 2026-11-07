output "bucket_name" {
  description = "Name of the private S3 bucket holding site content."
  value       = aws_s3_bucket.site.bucket
}

output "distribution_domain_name" {
  description = "CloudFront domain name for the site."
  value       = aws_cloudfront_distribution.site.domain_name
}
