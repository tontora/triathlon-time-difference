<script lang="ts">
	import dayjs from 'dayjs';
	import { Button, RadioButton, RadioButtonGroup } from 'carbon-components-svelte';
	let startTime = dayjs();
	let spreadTime = 0;
	let isStarted = false;
	let gender: 'men|women;';

	function getTime() {
		return dayjs().diff(startTime, 'second', true);
	}

	function timeToString(timeBySeconds: number) {
		return dayjs(timeBySeconds * 1000)
			.subtract(9, 'hour')
			.format('H:mm:ss');
	}
</script>

<div class="control">
	<span>{timeToString(spreadTime)}</span>
	<div class="radio">
		<RadioButtonGroup bind:selected={gender}>
			<RadioButton labelText="女" value="women" />
			<RadioButton labelText="男" value="men" />
		</RadioButtonGroup>
	</div>
	<Button
		disabled={isStarted}
		on:click={() => {
			isStarted = true;
			startTime = dayjs();
			setInterval(() => {
				spreadTime = getTime();
			}, 1000);
		}}>スタート</Button
	>
</div>

<style>
	.control {
		margin: 0.5rem;
	}
	.radio {
		display: inline-block;
	}
</style>
