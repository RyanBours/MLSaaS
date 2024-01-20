terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  credentials = file(var.credentials_file)

  project = var.project
  region  = var.region
  zone    = var.zone
}

resource "google_storage_bucket" "mlsaas_transcriptions" {
  location                    = var.region
  name                        = "mlsaas_transcriptions"
  public_access_prevention    = "enforced"
  uniform_bucket_level_access = true
  project                     = var.project
  force_destroy               = true

  retention_policy {
    retention_period = 2678400
  }

  cors {
    origin          = ["http://localhost:3000", "http://34.140.238.118:80", "https://dashboard.ryanis.moe", "http://dashboard.ryanis.moe"]
    method          = ["GET", "PUT"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_pubsub_topic" "transcription-created" {
  name                       = "transcription-created"
  project                    = var.project
  message_retention_duration = "604800s" # 7 days
}

resource "google_pubsub_subscription" "transcriptions" {
  name  = "transcriptions"
  topic = google_pubsub_topic.transcription-created.name
}

resource "google_storage_notification" "notification" {
  bucket         = google_storage_bucket.mlsaas_transcriptions.name
  payload_format = "JSON_API_V1"
  topic          = google_pubsub_topic.transcription-created.name
  event_types    = ["OBJECT_FINALIZE"]
}

resource "google_pubsub_topic" "user-deleted" {
  name                       = "user-deleted"
  project                    = var.project
  message_retention_duration = "604800s" # 7 days
}

resource "google_pubsub_subscription" "users" {
  name  = "users"
  topic = google_pubsub_topic.user-deleted.name
}
