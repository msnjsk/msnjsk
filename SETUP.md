# Set up the GitHub profile README

Follow these steps to publish this README in the `msnjsk/msnjsk` profile
repository and enable the contribution snake, including private contribution
counts.

## 1. Prepare the README

1. Open `README.md` in this project.
2. Replace `https://www.linkedin.com/in/YOUR-LINKEDIN/` with your LinkedIn URL.
3. Check the project descriptions and links, and change anything that does not
   match your work. Only `printlab-studio` and `pixel-perfect-ui` are public
   right now, so only those projects can be linked to publicly.

## 2. Add the files to your profile repository

The profile repository must be named `msnjsk/msnjsk`. Add these files to it:

- Put this project's `README.md` at the **root** of the repository (not inside
  a folder).
- Put `snake.yml` at `.github/workflows/snake.yml`.
- Put `generate-snake.mjs` at `scripts/generate-snake.mjs`.

You can upload the files on GitHub, or use Git. With Git, clone the profile
repository, copy the prepared files into the paths above, then commit and push
them:

```bash
git clone https://github.com/msnjsk/msnjsk.git
cd msnjsk
# Copy README.md, .github/workflows/snake.yml, and scripts/generate-snake.mjs here.
git add README.md .github/workflows/snake.yml scripts/generate-snake.mjs
git commit -m "Set up profile README and contribution snake"
git push
```

Create any missing folders (`.github/workflows` and `scripts`) when uploading
files on GitHub.

## 3. Allow the workflow to publish the snake

The workflow saves its SVG files to a branch named `output`. Give it permission
to create and update that branch:

1. In the `msnjsk/msnjsk` repository on GitHub, open **Settings**.
2. Select **Actions → General**.
3. Scroll to **Workflow permissions**.
4. Select **Read and write permissions** and click **Save**.

## 4. Add a token for private contribution counts

The generator reads your contribution calendar with a personal access token for
your own account, which lets GitHub include your private contribution counts.
The profile's **Include private contributions** setting must also be enabled.

1. Open **Settings → Developer settings → Personal access tokens → Tokens
   (classic) → Generate new token (classic)** on GitHub.
2. Create a token with the **`read:user`** scope. Copy it once and keep it
   private. Do not put the token in the workflow file or README.
3. In the `msnjsk/msnjsk` repository, open **Settings → Secrets and variables
   → Actions → New repository secret**.
4. Name the secret `SNK_GITHUB_TOKEN`, paste the token as its value, and save.
5. In your GitHub profile settings, enable **Include private contributions**.

The workflow uses this secret only to read your contribution calendar. It uses
GitHub's workflow token to publish the generated SVGs.

## 5. Run the workflow

1. Open the repository's **Actions** tab.
2. Select **Generate contribution snake** in the workflow list on the left.
3. Click **Run workflow**, leave the branch set to `main`, then click the
   green **Run workflow** button in the menu.
4. Wait for the run to finish. A green check means it succeeded. Open **Code**,
   switch the branch dropdown to `output`, and confirm the two snake SVG files
   are there.
5. Refresh your profile README. The SVG may take a short time to update.

The workflow also runs daily and when you push to `main`. If the secret is
missing or GitHub rejects the request, the generation step will fail with an
error rather than silently publishing an empty calendar.

## 6. If the snake still looks empty

Check the contribution calendar on your GitHub profile. GitHub only counts
qualifying contributions. For commits, make sure the commit email address is
connected to your GitHub account and that the commits are on the repository's
default branch. Private contributions appear as counts only; this does not
reveal private repository names or details.
