import { ThumbsUp, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
	content: string
	onDeleteComment: (comment: string) => void
}

export function Comment({ content, onDeleteComment }: CommentProps) {
	const [likeCount, setLikeCount] = useState(0)

	function handleDeleteComment() {
		onDeleteComment(content)
	}

	function handleLikeComment() {
		setLikeCount(previousLikeCount => previousLikeCount + 1)
	}

	return (
		<div className={styles.comment}>
			<Avatar hasBorder={false} src="https://github.com/mateeusls.png"/>

			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<strong>Matheus Lopes</strong>

							<time dateTime='2023-04-13 21:35:20' title='11 de Maio às 21:36h'>Cerca de 1hr atrás</time>
						</div>

						<button 
							title='Deletar comentário'
							onClick={handleDeleteComment}
						>
							<Trash size={24}/>
						</button>
					</header>

					<p>{content}</p>
				</div>

				<footer>
					<button onClick={handleLikeComment}>
						<ThumbsUp size={20}/>
						Aplaudir <span>{likeCount}</span>
					</button>
				</footer>
			</div>
		</div>
	)
}