<script setup lang="ts">
  //  import DeviceItem from './DeviceItem.vue';

   import data from '../../public/data/data.json'

   import type { IDevice, INode } from '@/types/types';

   const devices = data.devices as IDevice[]
</script>

<template>
  <div class="container">
    <h1>Список Устройств</h1>
    <ul class="device-list">
      <li v-for="device of devices" :key="device.id">
        <DeviceItem :device="device" />
      </li>
    </ul>
  </div>
</template>

