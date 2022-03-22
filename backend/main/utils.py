from .models import Room

def changeUserInDatabase(room_group_name,user_name):
    # Changes room object in database with room__group_name to user_name
    room = Room.objects.get(name=room_group_name)

    if not room.nameExists(user_name):
        if not room.red:
            room.red = user_name
            userColor = 'red'
        elif not room.green:
            room.green = user_name
            userColor = 'green'
        elif not room.yellow:
            room.yellow = user_name
            userColor = 'yellow'
        elif not room.blue:
            room.blue = user_name
            userColor = 'blue'
        room.save()
    return room,userColor     


def setDisconnectingUserToNoneInDatabase(room_group_name,color):
    room = Room.objects.get(name=room_group_name)
    if color == 'red':
        room.red = None
    elif color == 'green':
        room.green = None
    elif color == 'yellow':
        room.yellow = None
    elif color == 'blue':
        room.blue = None
    room.save()
    return room