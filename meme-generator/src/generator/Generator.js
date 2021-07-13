import React, {Component} from 'react'
import axios from 'axios'
import './Generator.css'

class Generator extends Component { 
	constructor() {
		super()
		this.state = {
			topText: '',
			bottomText: '',
			randomImg: 'http://i.imgflip.com/1bij.jpg',
			data: []
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		axios.get('https://api.imgflip.com/get_memes')
			.then(res => this.setState({data: res.data.data.memes}))
			.catch((err) => console.log(err))
	}

	handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

	 handleSubmit(event) {
        event.preventDefault()
		const len = this.state.data.length
        const randNum = Math.floor(Math.random() * len)
        const randMemeImg = this.state.data[randNum].url
        this.setState({ randomImg: randMemeImg })
    }

	render() {
		const{data, topText, bottomText, randomImg} = this.state

		return (
			<div>
				 <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={topText}
                        onChange={this.handleChange}
                    /> 
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={bottomText}
                        onChange={this.handleChange}
                    /> 
                    <button>Gen</button>
                </form>
				 <div className="meme">
                    <img src={randomImg} alt="" />
                    <h2 className="top">{topText}</h2>
                    <h2 className="bottom">{bottomText}</h2>
                </div>
			</div>
		)
	}
}

export default Generator
