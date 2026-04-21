# Frontend (Astro)

This package provides a simple static-generated contact form.

## Run

- `yarn workspace @challenge/frontend dev`

## Build

- `yarn workspace @challenge/frontend build`

## Notes

- The page posts form data to the backend endpoint: `POST /api/contact`.
- During local development this resolves to: `http://localhost:3000/api/contact`.
- `message` is user-provided and validated by the shared schema in `@challenge/lib`.
- Validation errors are displayed as user-friendly messages in the UI.