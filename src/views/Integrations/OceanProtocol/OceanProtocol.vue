<template>
  <PageLayout :pluginName="$options.PLUGIN_NAMES.OCEAN_PROTOCOL">
    <template v-slot:pluginTitle>
      {{$t('OceanProtocol.videowiki')}}<br /> {{$t('OceanProtocol.ocean')}}
    </template>
    <template v-slot:pluginDesc>
       {{$t('OceanProtocol.help')}}
    </template>
  </PageLayout>
</template>
<script>
import { PLUGIN_NAMES } from '@/assets/data';
import PageLayout from '../components/PageLayout';
export default {
  name: 'OceanProtocol',
  components: {
    PageLayout
  },
  PLUGIN_NAMES
};
</script>
