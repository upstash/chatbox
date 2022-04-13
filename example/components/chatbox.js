function Chatbox(props) {
    let chatItems = props.chat ? props.chat : []

    function parseString(str) {
        let sender = str.substr(0, 1)
        let message = str.substr(2)
        return [sender, message]
    }

    const listItems = chatItems.map((item, index) => {
        const parsedStr = parseString(item)
        const floatType = parsedStr[0] == "i" ? "left" : "right"
        return (
            // <li key={index} style={{float: floatType, listStylePosition}}>
            <li key={index}>
                {/* {parseString(item)[1]} */}
                {parsedStr[0]}:{parsedStr[1]}
            </li>
        )
    })
    return (
        <div>
            <h2>
                Chat:
            </h2>

            <ul>
                {listItems}
            </ul>
        </div>
    )
}

export default Chatbox