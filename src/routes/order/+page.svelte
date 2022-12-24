<script lang="ts">
	import { onMount } from 'svelte';

	let step: number = 1;
	export let data;

	const { menu, es } = data;

	let cartVal: number = 1,
		esVal: number = 1;
	let paymentMethod: string = '';

	let itemCount = {
		bCount: 0,
		lCount: 0,
		dCount: 0
	};

	let fname: string = '';
	let lname: string = '';
	let venue: string = '';
	let eventName: string = '';

	let cartItems: any[] = [];
	let esItems: any[] = [];

	let date = {
		year: '',
		month: '',
		date: ''
	};
	let basicInfo = {
		fname,
		lname,
		venue,
		eventName,
		date: ''
	};

	const handleAdd = () => {
		let ppp = menu[cartVal - 1].pricePerPlate;
		let item = {
			bCount: Number(itemCount.bCount),
			lCount: Number(itemCount.lCount),
			dCount: Number(itemCount.dCount),
			totalCost: itemCount.bCount * ppp + itemCount.lCount * ppp + itemCount.dCount * ppp,
			menu_item_id: cartVal,
			log_event_id: 1
		};
		cartItems.push(item);
		alert(`${menu[cartVal - 1].itemName} added. Cost ${item.totalCost}`);
	};

	const handleAddEs = () => {
		esItems.push(esVal);
		alert(`${es[esVal - 1].serviceName} added. Cost ${es[esVal - 1].cost}`);
	};

	const handleNext = () => {
		switch (step) {
			case 1:
				basicInfo.fname = fname;
				basicInfo.lname = lname;
				basicInfo.venue = venue;
				basicInfo.eventName = eventName;
				basicInfo.date = `${date.year}-${date.month}-${date.date}`;
				console.log(basicInfo);
				break;
			case 2:
				if (cartItems.length === 0) {
					alert('You should select atleast one item');
					return;
				}
				break;
			case 3:
				getTotalCost();
				break;
		}
		step++;
	};
	let totalCost = 0;
	const getTotalCost = () => {
		totalCost = 0;
		cartItems.forEach((i) => {
			totalCost += i.totalCost;
		});
		esItems.forEach((i) => {
			totalCost += es[i - 1].cost;
		});
	};

	const handlePay = () => {
		console.log(basicInfo);
		console.log(cartItems);
		console.log(esItems);
		console.log(totalCost, paymentMethod);
		alert('Order Successfull');
		window.location.assign('/');
	};
</script>

<svelte:head>
	<title>Order</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<ul class="steps">
	<li class="step {step >= 1 ? 'step-primary' : ''}">Basic Information</li>
	<li class="step {step >= 2 ? 'step-primary' : ''}">Orders</li>
	<li class="step {step >= 3 ? 'step-primary' : ''}">Extra Services</li>
	<li class="step {step >= 4 ? 'step-primary' : ''}">Payment</li>
</ul>

{#if step === 1}
	<form action="" class="form-control w-full max-w-screen grid grid-cols-2 pl-36 py-20 gap-10">
		<div>
			<label class="label" for="fname">
				<span class="label-text">First Name</span>
			</label>
			<input
				name="fname"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={fname}
			/>
		</div>
		<div>
			<label class="label" for="lname">
				<span class="label-text">Last Name</span>
			</label>
			<input
				name="lname"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={lname}
			/>
		</div>
		<div>
			<label class="label" for="venue">
				<span class="label-text">Venue</span>
			</label>
			<input
				name="venue"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={venue}
			/>
		</div>
		<div>
			<label class="label" for="eventName">
				<span class="label-text">Event name</span>
			</label>
			<input
				name="eventName"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={eventName}
			/>
		</div>
	</form>
	<form action="" class="form-control w-full max-w-screen grid grid-cols-3 pl-20 py-20 gap-10">
		<div>
			<label class="label" for="year">
				<span class="label-text">Year</span>
			</label>
			<input
				name="year"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={date.year}
			/>
		</div>
		<div>
			<label class="label" for="month">
				<span class="label-text">Month</span>
			</label>
			<input
				name="month"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={date.month}
			/>
		</div>
		<div>
			<label class="label" for="date">
				<span class="label-text">Date</span>
			</label>
			<input
				name="date"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={date.date}
			/>
		</div>
	</form>
{:else if step == 2}
	<h1 class="text-center text-2xl mt-10">Cart Items</h1>
	<div class="flex justify-center w-full max-w-screen pl-20 py-20 gap-96">
		<div>
			<label class="label" for="itemName">
				<span class="label-text">Item Name</span>
			</label>
			<select class="select select-bordered w-full max-w-xs" bind:value={cartVal} for="itemName">
				<option disabled selected>Pick the item</option>
				{#each menu as i}
					<option value={i.itemId}>{i.itemName}</option>
				{/each}
			</select>
		</div>
		<div class="grid place-items-center">
			<h3 class="text-xl">Price per plate: <strong>{menu[cartVal - 1].pricePerPlate}</strong></h3>
		</div>
	</div>
	<div class="form-control w-full max-w-screen grid grid-cols-3 pl-20 py-20 gap-10">
		<div>
			<label class="label" for="breakfast">
				<span class="label-text">Breakfast</span>
			</label>
			<input
				name="breakfast"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={itemCount.bCount}
			/>
		</div>
		<div>
			<label class="label" for="lunch">
				<span class="label-text">Lunch</span>
			</label>
			<input
				name="lunch"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={itemCount.lCount}
			/>
		</div>
		<div>
			<label class="label" for="dinner">
				<span class="label-text">Dinner</span>
			</label>
			<input
				name="dinner"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={itemCount.dCount}
			/>
		</div>
	</div>
	<div class="flex justify-center">
		<button class="btn btn-secondary" on:click={handleAdd}>Add</button>
	</div>
{:else if step === 3}
	<h1 class="text-center text-2xl mt-10">Extra Services</h1>
	<div class="flex justify-center w-full max-w-screen pl-20 py-20 gap-96">
		<div>
			<label class="label" for="esName">
				<span class="label-text">Extra Service</span>
			</label>
			<select class="select select-bordered w-full max-w-xs" bind:value={esVal} for="esName">
				<option disabled selected>Pick the item</option>
				{#each es as i}
					<option value={i.sId}>{i.serviceName}</option>
				{/each}
			</select>
		</div>
		<div class="grid place-items-center">
			<h3 class="text-xl">Price per plate: <strong>{es[esVal - 1].cost}</strong></h3>
		</div>
	</div>
	<div class="flex justify-center">
		<button class="btn btn-secondary" on:click={handleAddEs}>Add</button>
	</div>
{:else if step === 4}
	<h1 class="text-center text-2xl mt-10">Payment Details</h1>
	<div class="flex justify-center w-full max-w-screen pl-20 py-20 gap-96">
		<div class="grid place-items-center">
			<h3 class="text-xl">Total Cost: <strong>{totalCost}</strong></h3>
		</div>
		<div>
			<label class="label" for="paymentMethod">
				<span class="label-text">Payment Method</span>
			</label>
			<select
				class="select select-bordered w-full max-w-xs"
				bind:value={paymentMethod}
				for="paymentMethod"
			>
				<option disabled selected>Pick the item</option>
				<option value="Gpay">G Pay</option>
				<option value="Paytm">Paytm</option>
				<option value="Net Banking">Net Banking</option>
				<option value="UPI">UPI</option>
			</select>
		</div>
	</div>
	<div class="flex justify-center">
		<button class="btn btn-secondary" on:click={handlePay}>Pay</button>
	</div>
{/if}

<div class="flex justify-between p-5">
	<button
		class="btn btn-accent prev-btn {step === 1 ? 'btn-disabled' : ''}"
		on:click={() => (step -= 1)}>Previous</button
	>
	<button class="btn btn-primary next-btn {step === 4 ? 'btn-disabled' : ''}" on:click={handleNext}
		>Next</button
	>
</div>
