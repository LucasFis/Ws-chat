import "./Message.css"

const Message = ({author, content}) => {
    return (
        <h6 className="message">{author}: {content}</h6>
    )
}

export default Message