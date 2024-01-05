<template>
  <PageLayout :pluginName="$options.PLUGIN_NAMES.MS_TEAMS">
    <template v-slot:pluginTitle>
      {{$t('MsTeams.videowiki')}} <br />{{$t('MsTeams.ms')}}
    </template>
    <template v-slot:pluginDesc>
     {{$t('MsTeams.About.title1')}}
    </template>
  </PageLayout>
</template>
<script>
import { PLUGIN_NAMES } from '@/assets/data';
import PageLayout from '../components/PageLayout';
export default {
  name: 'MsTeams',
  components: {
    PageLayout
  },
  PLUGIN_NAMES
};
</script>
