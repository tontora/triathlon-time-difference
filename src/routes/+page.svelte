<script lang="ts">
	let startTime = new Date();
	let spreadTime: number;

	function getTime() {
		return new Date().getTime() - startTime.getTime();
	}
	function timeConvertToString(time: number) {
		return `${Math.floor(time / (1000 * 60 * 60))}:${Math.floor(time / (1000 * 60))}:${
			Math.floor(time / 1000) % 60
		}`;
	}

	setInterval(() => {
		spreadTime = getTime();
	}, 1000);
</script>

<div>
	<p>{timeConvertToString(spreadTime)}</p>
</div>
