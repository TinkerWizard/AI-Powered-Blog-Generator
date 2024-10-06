from fastapi import APIRouter

from api.routes import users, authentication, blogs, followers

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(authentication.router, prefix='/auth', tags=["Authentication"])
api_router.include_router(blogs.router, prefix='/blogs', tags=["Blogs"])
api_router.include_router(followers.router, prefix='/followers', tags=["Followers"])