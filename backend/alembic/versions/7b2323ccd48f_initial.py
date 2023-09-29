"""initial

Revision ID: 7b2323ccd48f
Revises: 
Create Date: 2023-09-29 12:42:09.763165

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7b2323ccd48f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, index=True, autoincrement=True),
        sa.Column('username', sa.String, unique=True, index=True),
        sa.Column('email', sa.String, unique=True, index=True),
        sa.Column('password', sa.String),
        sa.Column('full_name', sa.String, nullable=True),
        sa.Column('bio', sa.String, nullable=True),
        sa.Column('current_city', sa.String, nullable=True),
        sa.Column('birth_place', sa.String, nullable=True),
        sa.Column('relationship_status', sa.String, nullable=True),
        sa.Column('profile_picture', sa.String, nullable=True),
        sa.Column('cover_picture', sa.String, nullable=True),
        sa.Column('registration_date', sa.DateTime, nullable=True),
    )

    op.create_table(
        'posts',
        sa.Column('id', sa.Integer, primary_key=True, index=True, autoincrement=True),
        sa.Column('content', sa.String),
        sa.Column('image_url', sa.String),
        sa.Column('creation_date', sa.DateTime),
        sa.Column('author_id', sa.Integer, sa.ForeignKey('users.id')),
    )

    op.create_table(
        'friendships',
        sa.Column('id', sa.Integer, primary_key=True, index=True, autoincrement=True),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id')),
        sa.Column('friend_id', sa.Integer, sa.ForeignKey('users.id')),
    )

def downgrade():
    op.drop_table('friendships')
    op.drop_table('posts')
    op.drop_table('users')