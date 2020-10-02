import React from "react";
import {
	FacebookShareButton,
	FacebookIcon,
	VKShareButton,
	VKIcon,
	TwitterShareButton,
	TwitterIcon
} from "react-share";
import "../../App.css"

export default function FacebookShareBtn(props) {
	let message = props.indexLegends.map((el, i) => {
		if (props.legends[i].name == "Матраимовы" || props.legends[i].name == "Жээнбеков") {
			let legend = Object.values(props.legends[i])[el]

			return legend
		}
	})

	message = message.filter(el => el != undefined)
	return (
		<div className={"buttonsShare"}>
			<TwitterShareButton
				className={'twitter'}
				url={props.compass_url}
				title={message.join(' ') + "\n\n" + `Ближайшая мне партия — ${props.nearestParty}. А у тебя? Пройди тест и узнай:`}
			>
				<div>
					<TwitterIcon
						size={"2.5rem"}
						round
					/>
					{/*<p>Поделиться в Twitter</p>*/}
				</div>
			</TwitterShareButton>
			<FacebookShareButton
				className={'fbb'}
				url={props.compass_url}
				quote={message.join(' ') + "\n\n" + `Ближайшая мне партия — ${props.nearestParty}. А у тебя? Пройди тест и узнай:${props.compass_url}`}
			>
				<div>
					<FacebookIcon
						size={"2.5rem"}
						round
					/>
					{/*<p>Поделиться в Facebook</p>*/}
				</div>
			</FacebookShareButton>
			<VKShareButton
				url={props.compass_url}
				title={message.join(' ') + "\n" + `Ближайшая мне партия — ${props.nearestParty}. А у тебя? Пройди тест и узнай:`}
			>
				<div>
					<VKIcon
						size={"2.5rem"}
						round/>
					{/*<p>Поделиться в VK</p>*/}
				</div>
			</VKShareButton>
		</div>
	)
}