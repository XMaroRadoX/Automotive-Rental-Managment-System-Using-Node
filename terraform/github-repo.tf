resource "github_repository" "github_repo" {
  name        = var.github_repository_name
  description = "car-rental-system repo for testing"
  visibility  = "public"

  template {
    owner      = "xmaroradox"
    repository = "car-rental-system"
  }

  depends_on = [
    aws_iam_user.mirror_user,
    aws_iam_group.mirror_group,
    aws_codecommit_repository.test
  ]
}

resource "github_actions_secret" "SSH_Private" {
  repository      = github_repository.github_repo.name
  secret_name     = "CODECOMMIT_SSH_PRIVATE_KEY"
  plaintext_value = file("../keys/git_key/id_ed25519")
}

resource "github_actions_secret" "SSH_Private_ID" {
  repository      = github_repository.github_repo.name
  secret_name     = "CODECOMMIT_SSH_PRIVATE_KEY_ID"
  plaintext_value = aws_iam_user_ssh_key.ssh_key.ssh_public_key_id
}

resource "github_actions_secret" "CodeCommit_repo" {
  repository      = github_repository.github_repo.name
  secret_name     = "CODECOMMIT_TARGET_REPO"
  plaintext_value = aws_codecommit_repository.test.clone_url_ssh
}
