## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
y2m.app
├───.github
│   └───workflows -------- Holds GitHub Actions workflow files
├───.vscode
│   └───... -------------- Recommended VSCode extensions for development
|
├───public ---------------Location for static assets like images
│   └───about             (NextJS optimizes assets in this folder)
└───src
    ├───app
    │   ├───PAGE_NAME
    │   │   └───components -- React components specific to PAGE_NAME
    │   │
    │   ├───api
    │   │   ├───auth
    │   │   |   └───[auth0] -- Auth0 authentication setup (do not modify)
    |   |   └───API_PATH ----- Any folder with a route.ts file will be live
    |   |
    |   |
    │   └───... -------------- Main app router entry point
    |                          (CAUTION: special filenames will be rendered
    |                           e.g. page, layout, error, loading)
    ├───components
    │   ├───GROUP_NAME ------ Global components specific to GROUP
    │   ├───ui ------------- Shadcn UI components
    |   |                    (avoid modifying to prevent confusion)
    |   |
    |   └───... ------------ Add new global components here
    |
    ├───config ------------- Configuration files for page content
    ├───lib ---------------- Global utility functions
    ├───styles ------------- CSS variables and styles
    └───types -------------- TypeScript type definitions
```
