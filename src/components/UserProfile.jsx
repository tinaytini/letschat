import { Link } from 'react-router-dom'

function UserProfile({ modal, onClose, photoURL, displayName }) {
    if (!modal) {
        return null;
    } else {
        return (
            <div className="modal">
                <div className="modal__content">
                    <img style={{height: '100px'}} src={photoURL ? photoURL : 'https://picsum.photos/50'} alt="" />
                    <h3>{displayName}</h3>
                    <Link className='sendMessage' to={`/chats/${displayName}`}>Send Message</Link>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }
}

export default UserProfile;
