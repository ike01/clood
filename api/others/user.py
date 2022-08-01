import jwt
from passlib.hash import bcrypt
from getpass import getpass


def createUser(es, new_user, secret, user_db):
    '''
    Create a new user and access token and save in database
    '''
    print(new_user)
    hasher = bcrypt.using(rounds=13)
    new_user['password'] = hasher.hash(new_user['password'])  # hash the password
    new_user['token'] = jwt.encode({"user_id": new_user['username'], "user_type": "admin"}, secret, algorithm="HS256")  # jwt token
    new_user['api_token'] = jwt.encode({"user_type": "api"}, secret, algorithm="HS256")  # jwt token
    # save to database
    es.index(index=user_db, body=new_user, id=new_user['username'])

    return new_user


def isValidUser(db_user, curr_user):
    '''
    Checks if a user is authenticated
    '''
    hasher = bcrypt.using(rounds=13)
    return hasher.verify(curr_user.password, db_user.password)


# def createAPIToken(es, user, secret):
#     '''
#     Create API access for an authenticated user
#     '''
#     user.password = hasher.hash(user.password)  # hash the password
#     user.token = jwt.encode({"user_id": user.username, "user_type": "admin"}, secret, algorithm="HS256")  # jwt token
#     # save to database
#     res = es.index(index=user_db, body=user, id=user.username)
#     return