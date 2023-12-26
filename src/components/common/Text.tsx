interface TextProp {
	style?: string;
	content: string;
}

export default function Text(props: TextProp) {
	return (
		<p className={`inline-block align-baseline font-istok ${props.style}`}>
			{props.content}
		</p>
	);
}
