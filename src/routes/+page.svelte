<script lang="ts">
	import dayjs from 'dayjs';
	import { Button, ComboBox, RadioButton, RadioButtonGroup } from 'carbon-components-svelte';
	import { startListMen } from './start-list-men';
	import { startListWomen } from './start-list-women';
	let startTime = dayjs();
	let spreadTime = 0;
	let isStarted = false;
	let gender: 'men' | 'women' | undefined;

	const startLists = { men: startListMen, women: startListWomen };

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
		disabled={isStarted || !gender}
		on:click={() => {
			isStarted = true;
			startTime = dayjs();
			setInterval(() => {
				spreadTime = getTime();
			}, 1000);
		}}>スタート</Button
	>
</div>
<div class="input-box">
	<ComboBox
		placeholder="No. or name"
		items={(gender ? startLists[gender] : []).map((item) => ({
			...item,
			text: `${item.id}: ${item.lastName} ${item.firstName} : ${item.team}`,
			key: item.id,
		}))}
		shouldFilterItem={(item, value) => {
			if (!value) return true;
			return item.text.split(':')[1].includes(value) || String(item.id).indexOf(value) === 0;
		}}
		disabled={!isStarted}
	/>
	<Button>通過</Button>
</div>

<style>
	.control {
		margin: 0.5rem;
	}

	.radio {
		display: inline-block;
	}

	.input-box {
		display: flex;
	}
</style>
