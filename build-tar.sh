# Backend
tar --exclude="node_modules" -czf wos-backend.tar backend/

# Frontend
tar --exclude="node_modules" -czf wos-frontend.tar frontend/
# tar --exclude="node_modules" --exclude=".env" -czf wos-frontend.tar frontend/
