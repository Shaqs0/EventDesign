import axios from "axios";
import { useEffect } from "react";

export function FavoritesPage () {
	useEffect(() => {
		const fetchSliderData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/`
				);
				console.log(response);
			} catch (error) {
				console.error(error);
			}
		};
		fetchSliderData();
	}, []);
	return (
		<div>
            
		</div>
	);
}