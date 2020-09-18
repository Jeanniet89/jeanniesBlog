import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class PublishBlogs extends React.Component {
	constructor(props) {
        super(props);

        this.onShow = this.onShow.bind(this);
	}
	onShow() {
		window.location.pathname = `/posts/${this.props.post._id}`;
    }

	renderDate(dateString) {
		const monthNames = ['September'];

		const date = new Date(dateString);

		return `${
			monthNames[date.getMonth()]
		} ${date.getDate()}, ${date.getFullYear()}`;
	}
	render() {
		const { post } = this.props;
		return (
			<Container className='bloglist-container'>
				<Link to='/posts' target='_blank' rel='noopener noreferrer'>
					<Button className='bloglist-btn'>
						<div>
							<h1>{post.title}</h1>
							<h2>{post.text}</h2>
							<span>{this.renderDate(post.createdAt)}</span>
						</div>
					</Button>
				</Link>
			</Container>
		);
	}
}

export default PublishBlogs;
