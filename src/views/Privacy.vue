<template>
  <div class="bg-white">
    <div class="w-4/5 mx-auto pt-base pb-base">
      <h4 class="text-center mb-base">{{ $t('Privacy.Privacy.title') }}</h4>
      <p>
        {{ $t('Privacy.Privacy.start1') }}
      </p>
      <br />
      <p class="text-muted text-xs">
        {{ $t('Privacy.Privacy.start2') }}
      </p>
      <table>
        <tr>
          <td>
            <h5>{{ $t('Privacy.Information.collected.title') }}</h5>
            <p class="text-xs">
              {{ $t('Privacy.Information.collected.start') }}
            </p>
          </td>
          <td>
            <h5>{{ $t('Privacy.Information.collected.basically_t') }}</h5>
            <h4>
              {{ $t('Privacy.Information.collected.basically_p') }}
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <h5>{{ $t('Privacy.Information.provide.title') }}</h5>
            <ol>
              <li>
                {{ $t('Privacy.Information.provide.points[0][0]') }}
              </li>
              <li>
                <b> {{ $t('Privacy.Information.provide.points[1][0]') }}</b
                >: {{ $t('Privacy.Information.provide.points[1][1]') }}
              </li>
              <li>
                <b> {{ $t('Privacy.Information.provide.points[2][0]') }}</b
                >: {{ $t('Privacy.Information.provide.points[2][1]') }}
              </li>
              <li>
                <b> {{ $t('Privacy.Information.provide.points[3][0]') }}</b
                >:
                <ol>
                  <li>
                    {{ $t('Privacy.Information.provide.points[3][1]') }}
                  </li>
                  <li>
                    {{ $t('Privacy.Information.provide.points[3][2]') }}
                  </li>
                  <li>
                    {{ $t('Privacy.Information.provide.points[3][3]') }}
                  </li>
                </ol>
              </li>
            </ol>
          </td>
          <td>
            <h5>{{ $t('Privacy.Information.provide.basically_t') }}</h5>
            <h4>
              {{ $t('Privacy.Information.provide.basically_p') }}
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <h5>{{ $t('Privacy.Email.title') }}</h5>
            <p>
              {{ $t('Privacy.Email.info1') }}<br />
              {{ $t('Privacy.Email.info2') }}
            </p>
          </td>
          <td>
            <h5>{{ $t('Privacy.Email.basically_t') }}</h5>
            <h4>
              {{ $t('Privacy.Email.basically_p') }}
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <h5>{{ $t('Privacy.Cookies.title') }}</h5>
            <p>
              {{ $t('Privacy.Cookies.info1') }}
              <br />
              {{ $t('Privacy.Cookies.info2') }}
            </p>
          </td>
          <td>
            <h5>{{ $t('Privacy.Cookies.basically_t') }}</h5>
            <h4>
              {{ $t('Privacy.Cookies.basically_p') }}
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <h5>{{ $t('Privacy.Sharing.title') }}</h5>
            <p>
              {{ $t('Privacy.Sharing.start') }}
            </p>
            <ul>
              <li>
                {{ $t('Privacy.Sharing.points[0][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Sharing.points[1][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Sharing.points[2][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Sharing.points[3][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Sharing.points[4][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Sharing.points[5][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Sharing.points[6][0]') }}
              </li>
            </ul>
          </td>
          <td>
            <h5>{{ $t('Privacy.Sharing.basically_t') }}</h5>
            <h4>
              {{ $t('Privacy.Sharing.basically_p') }}
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <h5>{{ $t('Privacy.Keeping.title') }}</h5>
            <ul>
              <li>
                {{ $t('Privacy.Keeping.points[0][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Keeping.points[1][0]') }}
              </li>
            </ul>
          </td>
          <td>
            <h5>{{ $t('Privacy.Keeping.basically_t') }}</h5>
            <h4>
              {{ $t('Privacy.Keeping.basically_p') }}
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <h5>{{ $t('Privacy.Ways.title') }}</h5>
            <ul>
              <li>
                {{ $t('Privacy.Ways.points[0][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Ways.points[1][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Ways.points[2][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Ways.points[3][0]') }}
              </li>
              <li>
                {{ $t('Privacy.Ways.points[4][0]') }}
              </li>
            </ul>
          </td>
          <td>
            <h5>{{ $t('Privacy.Ways.basically_t') }},</h5>
            <h4>
              {{ $t('Privacy.Ways.basically_p') }}
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <h5>{{ $t('Privacy.Analytics.title') }}</h5>
            <p>
              {{ $t('Privacy.Analytics.info') }}
            </p>
          </td>
          <td>
            <h5>{{ $t('Privacy.Analytics.basically_t') }}</h5>
            <h4>
              {{ $t('Privacy.Analytics.basically_p') }}
            </h4>
          </td>
        </tr>
      </table>

      <p>
        {{ $t('Privacy.Query.query') }}
        <router-link to="/contact-us" style="text-decoration: underline">{{
          $t('Privacy.Query.contact')
        }}</router-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Privacy',
};
</script>
<style scoped>
h4 {
  font-size: 17.48px;
  font-weight: 400;
}
h5 {
  font-weight: 400;
}
table {
  border-collapse: separate;
  border-spacing: 0 4rem;
}
table td {
  width: 50%;
}
table tr {
  vertical-align: baseline;
  margin-bottom: 4rem;
}
table tr td h5 {
  margin-bottom: 1.25rem;
}
table tr td:nth-child(1) {
  padding-right: 2rem;
}
table tr td:nth-child(2) {
  padding-left: 2rem;
}
table tr td p {
  font-size: 0.75rem;
}
table tr td ul {
  font-size: 0.75rem;
}
table tr td ol {
  font-size: 0.75rem;
}
ul li {
  list-style-type: disc;
  margin-left: 1.25rem;
}
ol li {
  list-style-type: decimal;
  margin-left: 1rem;
}
</style>
