import React from "react";
import {
	FacebookShareButton,
	FacebookIcon,
} from "react-share";

export default function FacebookShareBtn(props) {
	let message = props.axises_title.map((el, i)=> el+': ' + parseFloat(props.axises[i]).toFixed(2))
	return (
			<FacebookShareButton
				url={'www.youtube.com'}
				shareImage={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'}
				quote={	message.join('\n')}
			>
				<FacebookIcon
					size={"2.5rem"}
				/>
			</FacebookShareButton>
	)
}