# Set up the GitHub profile README

Follow these steps to publish this README in the `msnjsk/msnjsk` profile
repository and enable the contribution snake animation.

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
- Put this project's `snake.yml` at
  `.github/workflows/snake.yml`. The `.github/workflows` folders must be part
  of the path.

You can upload the files on GitHub, or use Git. With Git, clone the profile
repository, copy the prepared `README.md` and workflow file into the paths
above, then commit and push them:

```bash
git clone https://github.com/msnjsk/msnjsk.git
cd msnjsk
# Copy README.md here, and copy snake.yml to .github/workflows/snake.yml.
git add README.md .github/workflows/snake.yml
git commit -m "Set up profile README"
git push
```

If you upload files on GitHub, create the workflow using the full path
`.github/workflows/snake.yml` so GitHub recognizes it as an Actions workflow.

## 3. Allow the workflow to publish the snake

The workflow saves its SVG files to a branch named `output`. Give it permission
to create and update that branch:

1. In the `msnjsk/msnjsk` repository on GitHub, open **Settings**.
2. Select **Actions → General**.
3. Scroll to **Workflow permissions**.
4. Select **Read and write permissions** and click **Save**.

## 4. Run the workflow once

1. Open the repository's **Actions** tab.
2. Select **Generate contribution snake** in the workflow list on the left.
3. Click **Run workflow**, leave the branch set to `main`, then click the
   green **Run workflow** button in the menu.
4. Wait for the run to finish. A green check means it succeeded. Open
   **Code** and confirm that an `output` branch now exists.

The README already points to the SVG files on that `output` branch. Once the
branch exists, the snake should appear on your profile. The workflow also runs
daily and when you push to `main`.

## 5. If the snake looks empty

A successful workflow means the SVG files were published; it does not guarantee
that there is contribution activity to draw. Check the contribution calendar
on your GitHub profile. If it is empty, the snake may appear as only a few
colored squares or look blank.

GitHub only counts qualifying contributions. For commits, make sure the commit
email address is connected to your GitHub account and that the commits are on
the repository's default branch. For private activity in the snake, follow the
next section, then run the workflow again. Changing the profile display setting
alone does not update an already-generated SVG.

## 6. Let the workflow read private contributions

The profile setting and the workflow token do different things: **Include
private contributions** controls what GitHub displays on your profile, while
the workflow needs a token authenticated as your account to read that activity.
The workflow uses `github.token` by default; add a personal access token if
the generated snake still omits your private contributions.

1. On GitHub, open **Settings → Developer settings → Personal access tokens →
   Tokens (classic) → Generate new token (classic)**.
2. Create a token with only the **`read:user`** scope. Copy it once and keep it
   private. Never put the token in the workflow file or README.
3. In the `msnjsk/msnjsk` repository, open **Settings → Secrets and variables
   → Actions → New repository secret**.
4. Name the secret `SNK_GITHUB_TOKEN`, paste the token as its value, and save.
5. Make sure **Include private contributions** is enabled in your GitHub
   profile settings.
6. Add and push the updated `.github/workflows/snake.yml` from this project.
   It is configured to use `SNK_GITHUB_TOKEN` when present and fall back to
   GitHub's workflow token otherwise.
7. Run **Generate contribution snake** again from the **Actions** tab. After
   it succeeds, refresh your profile; the SVG may take a short time to update.

Private contributions appear as counts only; this does not reveal private
repository names or details.
