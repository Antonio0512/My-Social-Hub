import "./friendshipNotifications.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {getFriendshipNotifications} from "../../services/notificationService";
import {Link} from "react-router-dom";

export const FriendshipNotification = () => {
    const {user, token} = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchFriendshipNotifications = async () => {
            try {
                const notificationsData = await getFriendshipNotifications(user?.id, token)
                setNotifications(notificationsData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFriendshipNotifications();
    }, [user.id, token]);

    return (
        <div className="notificationDropDown">
            {notifications.map((notification) => (
                <div className="notificationItem">{notification.message}</div>
            ))}
        </div>
    );
};