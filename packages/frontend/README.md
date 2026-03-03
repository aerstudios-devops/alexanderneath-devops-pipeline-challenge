# Frontend (Astro)

This package provides a simple static-generated contact form.

## Run

- `yarn workspace @challenge/frontend dev`

## Build

- `yarn workspace @challenge/frontend build`

## Notes

- The page posts form data to the backend endpoint: `POST /api/contact`.
- `message` is user-provided and validated by the shared schema in `@challenge/lib`.