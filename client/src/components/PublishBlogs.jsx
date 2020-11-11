import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class PublishBlogs extends React.Component {
	constructor(props) {
        super(props);

        this.onShow = this.onShow.bind(this);
	}
	onShow() {
		window.location.pathname = `/posts/${this.props.posts._id}`;
    }

	renderDate(dateString) {
		const monthNames = ['September'];

		const date = new Date(dateString);

		return `${
			monthNames[date.getMonth()]
		} ${date.getDate()}, ${date.getFullYear()}`;
	}
	render() {
		const { posts } = this.props;
		return (
			<Container className='bloglist-container'>
				<Link to='/posts' target='_blank' rel='noopener noreferrer'>
					<Button className='bloglist-btn'>
						<div>
							<h1>{posts.title}</h1>
							<h2>{posts.text}</h2>
							<span>{this.renderDate(posts.createdAt)}</span>
						</div>
					</Button>
				</Link>
			</Container>
		);
	}
}

export default PublishBlogs;
