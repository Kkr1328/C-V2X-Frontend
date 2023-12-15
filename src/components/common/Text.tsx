interface TextProp {
	color?: string;
	size: string;
	content: string;
}

export default function Text(props: TextProp) {
	return (
		<p
			className={`inline-block align-baseline font-istok ${props.color} ${props.size}`}
		>
			{props.content}
		</p>
	);
}
