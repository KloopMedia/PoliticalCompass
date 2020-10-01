import React from "react";
import {
	FacebookShareButton,
	FacebookIcon,
} from "react-share";
import "../../App.css"

export default function FacebookShareBtn(props) {
	let message = props.indexLegends.map((el, i) =>{
		if (props.legends[i].name=="Матраимовы" || props.legends[i].name=="Жээнбеков") {
			let legend = Object.values(props.legends[i])[el]

			return legend
		}
	})

	message = message.filter(el => el!=undefined)
	return (
			<FacebookShareButton
						className={'fb'}
						url={props.compass_url}
						quote={message.join(' ')+"\n\n"+`Ближайшая мне партия — ${props.nearestParty}. А у тебя? Пройди тест и узнай:${props.compass_url}`}
					>
						<div>
							<FacebookIcon
								size={"2.1rem"}
							/>
							<p>Поделиться результатом</p>
						</div>
					</FacebookShareButton>
	)
}