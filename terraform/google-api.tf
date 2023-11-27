resource "google_project_service" "Cloud_Storage_API" {
  service = "storage.googleapis.com"
  project = var.project
}

resource "google_project_service" "Cloud_PubSub_API" {
  service = "pubsub.googleapis.com"
  project = var.project
}

resource "google_project_service" "Cloud_Speech_to_Text_API" {
  service = "speech.googleapis.com"
  project = var.project
}

resource "google_project_service" "Cloud_Functions_API" {
  service = "cloudfunctions.googleapis.com"
  project = var.project
}

resource "google_project_service" "Cloud_Build_API" {
  service = "cloudbuild.googleapis.com"
  project = var.project
}

resource "google_project_service" "Cloud_Event_Arc_API" {
  service = "eventarc.googleapis.com"
  project = var.project
}

resource "google_project_service" "Cloud_Run_API" {
  service = "run.googleapis.com"
  project = var.project
}
