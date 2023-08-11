import { useState, useEffect } from "react"
import Error from "./components/Error"
import Loading from "./components/Loading"
import styled from "styled-components"
import { CommonContainer } from "./styles/styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons'

const Container = styled(CommonContainer)`
  gap: 0;
  background-color: ${props => props.color};
`
const QuoteBox = styled.div`
  width: 300px;
  border-radius: 3px;
  padding: 30px 25px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 30px;
  & > div {
    display: flex;
    justify-content: space-between;
  }
  & > div > div {
    display: flex;
  }
  @media (min-width: 600px) {
    width: 550px;
    padding: 40px 50px;
  }
`
const QuoteLeftIcon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color: ${props => props.color};
  transition: color 0s ease-in-out;
  @media (min-width: 600px) {
    width: 30px;
    height: 30px;
  }
`
const Quote = styled.h1`
  color: ${props => props.color};
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  @media (min-width: 600px) {
    font-size: 28px;
  }
`
const Author = styled.p`
  color: ${props => props.color};
  text-align: right;
`
const IconBox = styled.a`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  &:link, :visited {
    opacity: 1;
  }
  &:hover, :active {
    opacity: 0.8;
  }
  @media (min-width: 600px) {
    width: 40px;
    height: 40px;
  }
`
const Icon = styled(FontAwesomeIcon)`
  width: 15px;
  height: 15px;
  color: white;
  @media (min-width: 600px) {
    width: 18px;
    height: 18px;
  }
`
const Button = styled.button`
  justify-self: right;
  border: none;
  border-radius: 3px;
  width: 80px;
  height: 30px;
  font-size: 12px;
  color: white;
  background-color: ${props => props.color};
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 600px) {
    width: 100px;
    height: 40px;
    font-size: 14px;
  }
`
const App = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quote, setQuote] = useState({quote: "", author: ""})
  const [getNewQuote, setGetNewQuote] = useState(0)
  const tweetContent = '"' + quote.quote + '" -' + quote.author
  const colors = ["#2c3e50", "#342224", "#16a085", "#77b1a9", "#e74c3c", "#f39c12", "#73a857", "#bdbb99", "#472e32", "#27ae60"]
  const [color, setColor] = useState(colors[6])
  
  useEffect(() => {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(res => {
        if (res.ok) {
          setError(false)
          setLoading(false)
          return res.json()
        } else {
          setLoading(false)
          throw Error("error")
        }
      })
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.quotes.length)
        setQuote(data.quotes[randomIndex])
      })
      .catch(error => {
        setError(true)
      })
  }, [getNewQuote])

  const handleClick = () => {
    setGetNewQuote(prev => prev + 1)
    const randomIndex = Math.floor(Math.random() * colors.length)
    setColor(colors[randomIndex])
  }

  if (loading) return <Loading />
  if (error) return <Error />
  return(
    <Container color={color}>
      <QuoteBox id="quote-box">
        <Quote id="text" color={color}>
          <QuoteLeftIcon icon={faQuoteLeft} color={color}/>
          {quote.quote}
        </Quote>
        <Author id="author" color={color}>- {quote.author}</Author>
        <div>
          <div>
            <IconBox id="tweet-quote" color={color} href={`https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&text=${tweetContent}`} target="_blank">
              <Icon icon={faTwitter} />
            </IconBox>
            <IconBox id="tumblr-quote" color={color} href={`http://tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&content=${quote.quote}&&caption=${quote.author}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons`} target="_blank">
              <Icon icon={faTumblr}/>
            </IconBox>
          </div>
          <Button id="new-quote" color={color} onClick={handleClick}>New Quote</Button>
        </div>
      </QuoteBox>
    </Container>
  )
}

export default App