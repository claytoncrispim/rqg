// function QuoteBox(props) {
//     const quote = props.currentQuote.text;
//     const author = props.currentQuote.author;

//     return (
//         <div>
//             <h2>"{quote}"</h2>
//             <p>- {author}</p>
//         </div>
//     );
// }


// A cleaner, alternative version for QuoteBox.jsx which is to "destructure" the props directly in the function's arguments. Both versions do the exact same thing:
function QuoteBox({ currentQuote }) {
    return (
        <div>
            <h2>"{currentQuote.quote}"</h2>
            <p>- {currentQuote.author}</p>
        </div>
    )
}

export default QuoteBox;