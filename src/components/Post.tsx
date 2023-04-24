import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

interface Author {
	name: string;
	avatarUrl: string;
	role: string;
}

interface Content {
	type: 'paragraph' | 'link';
	content: string;
}

export interface IPost {
	id: number;
	author: Author;
	publishedAt: Date;
	content: Content[]
}

interface PostProps {
	post: IPost;
}

export function Post({ post }: PostProps) {
	const [comments, setComments] = useState([
		'Post muito bom!',
	])
	const [newCommentText, setNewCommentText] = useState("")

	const publishedAtFormatted = format(new Date(post.publishedAt), "d 'de' LLLL 'às' HH:mm'h'", { 
		locale: ptBR 
	})
	
	const publishedDateRelativeToNow = formatDistanceToNow(new Date(post.publishedAt), {
		locale: ptBR, addSuffix: true 
	})

	function handleCreateNewComment(event: FormEvent) {
		event.preventDefault()

		setComments(previousComments => [...previousComments, newCommentText])
		setNewCommentText("")
	}

	function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("")
		setNewCommentText(event.target.value)
	}

	function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("O campo é obrigatório!")
	}

	function deleteComment(commentToDelete: string) {
		const commentWithoutDeleteOne = comments.filter(comment => comment !== commentToDelete)

		setComments(commentWithoutDeleteOne)
	}

	const isNewCommentEmpty = newCommentText.length === 0

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={post.author.avatarUrl} />
					<div className={styles.authorInfo}>
						<strong>{post.author.name}</strong>
						<span>{post.author.role}</span>
					</div>
				</div>
				<time dateTime={post.publishedAt.toISOString()} title={publishedAtFormatted}>{publishedDateRelativeToNow}</time>
			</header>

			<div className={styles.content}>
				{post.content.map((line) => {
					if(line.type === 'paragraph'){
						return <p key={line.content}>{line.content}</p>
					} else if(line.type === 'link'){
						return <a href='#' key={line.content}>{line.content}</a>
					}
				})}
			</div>

			<form onSubmit={handleCreateNewComment} className={styles.commentForm}>
				<strong>Deixe seu feedback</strong>

				<textarea 
					name='comment' 
					placeholder='Deixe um comentário'
					value={newCommentText}
					onInvalid={handleNewCommentInvalid}
					onChange={
						handleNewCommentChange
					}
					required
				/>

				<footer>
					<button 
						type='submit'
						disabled={isNewCommentEmpty}
					>
						Publicar
					</button>
				</footer>
			</form>

			<div className={styles.commentList}>
				{comments.map(comment => {
					return (
						<Comment	
							key={comment} 
							content={comment} 
							onDeleteComment={deleteComment}
						/>
					)
				})}
			</div>
		</article>
	)
}