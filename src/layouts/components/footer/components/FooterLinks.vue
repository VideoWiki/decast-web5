<template>
  <div>
    <div class="font-bold mb-6 textwh">{{ sectionName }}</div>
    <div class="title-links">
      <template v-for="subSection in sections[sectionName]">
        <div :key="subSection.title" class="text-sm mb-3 textwh">
          <a
            :href="subSection.url"
            target="_blank"
            class="footer-link-item textwh"
            >{{ subSection.title }}</a
          >
          <div v-if="subSection.title == 'Integration'">
            <template v-for="sub in subSection.integrations">
              <ul :key="sub.title">
                <li>
                  <a
                    :href="sub.url"
                    target="_blank"
                    class="footer-sublink-item textwh"
                    >{{ sub.title }}</a
                  >
                </li>
              </ul>
            </template>
          </div>
        </div>
      </template>
      <div v-if="sectionName === 'Contact'" class="text-sm mb-3 textwh">
        <p href="#" class="footer-link-item mb-3 textwh">
          <vs-icon
            icon-pack="feather"
            icon="icon-phone"
            size="12px"
            rounded="true"
            style="align-self: flex-end"
          ></vs-icon>
          +351 912159105
        </p>
        <p href="#" class="footer-link-item leading-loose mb-3 textwh">
          <vs-icon
            icon-pack="feather"
            icon="icon-map-pin"
            size="12px"
            rounded="true"
            style="align-self: flex-end"
          ></vs-icon>
          LEREN LEREN , UNIPESSOAL LDA, Parque de Ciéncia e Inovacáo - Vía do
          Conhecimento s/n 3830-352 Ílhavo, Portugal
        </p>
        <p href="#" class="footer-link-item mb-3 textwh">
          NIF/NIPC - 517383861
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterLinks',
  props: {
    sectionName: String,
  },
  data() {
    return {
      sections: {
        Product: [
          /* {
            title: 'Acquire Users',
            url: '#'
          },
          {
            title: 'Blockchain',
            url: '#'
          }, */
          {
            title: this.$t('FooterLinks.Product[0]'),
            url: 'https://video.wiki/studio',
          },
          /* {
            title: 'Coaching',
            url: '#'
          }, */
          {
            title: this.$t('FooterLinks.Product[1]'),
            url: '/room',
          },
          {
            title: this.$t('FooterLinks.Product[2]'),
            url: 'https://cast.video.wiki/createEvent',
          },
          /* {
            title: 'Investores',
            url: '#'
          } */
        ],
        Company: [
          {
            title: this.$t('FooterLinks.Company[0]'),
            url: '/about',
          },
          {
            title: this.$t('FooterLinks.Company[1]'),
            url: '/team',
          },
          /* {
            title: 'Brand Guidelines',
            url: '#'
          }, */
          {
            title: this.$t('FooterLinks.Company[2]'), // 'Press Kit',
            url: '/contact-us',
          },
        ],
        Ecosystem: [
          {
            title: this.$t('FooterLinks.Ecosystem.awards'),
            url: '/awards',
          },

          {
            title: this.$t('FooterLinks.Ecosystem.integrations_head'),
            integrations: [
              {
                title: this.$t('FooterLinks.Ecosystem.integrations_list[0]'),
                url: '/integration/ocean-protocol',
              },
              {
                title: this.$t('FooterLinks.Ecosystem.integrations_list[1]'),
                url: '/integration/ms-teams',
              },
              {
                title: this.$t('FooterLinks.Ecosystem.integrations_list[2]'),
                url: '#',
              },
            ],
          },
          /* {
            title: 'Brand Guidelines',
            url: '#'
          }, */
          {
            title: this.$t('FooterLinks.Ecosystem.partners'), // 'Press Kit',
            url: '#',
          },
        ],
        Resources: [
          {
            title: this.$t('FooterLinks.Resources[0]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.Resources[1]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.Resources[2]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.Resources[3]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.Resources[4]'),
            url: '#',
          },
        ],
        'Terms and Conditions': [
          {
            title: this.$t('FooterLinks.T&C[0]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.T&C[1]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.T&C[2]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.T&C[3]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.T&C[4]'),
            url: '#',
          },
        ],
        ContactUs: [
          {
            title: this.$t('FooterLinks.T&C[0]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.T&C[1]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.T&C[2]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.T&C[3]'),
            url: '#',
          },
          {
            title: this.$t('FooterLinks.T&C[4]'),
            url: '#',
          },
        ],
      },
    };
  },
};
</script>
<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2.5rem;
}
.footer-link-item {
  color: #544837;
}
.footer-sublink-item {
  color: #544837;
  position: relative;
  padding-left: 8px;
}
.textwh {
  color: white;
}
</style>
