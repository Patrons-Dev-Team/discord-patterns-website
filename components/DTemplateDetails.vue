<template>
  <v-card>
    <v-card-text>
      <v-list-group
        no-action
        active-class="white--text"
        prepend-icon="mdi-information"
        value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>{{
            $t('template.details.general.TITLE')
          }}</v-list-item-title>
        </template>
        <v-list dense>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.general.CODE_TITLE')
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    $t('template.details.general.CODE_DESCRIPTION')
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <kbd>{{ templateData.dprops.code }}</kbd>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.general.NAME_TITLE')
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    $t('template.details.general.NAME_DESCRIPTION')
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <p>{{ templateData.dprops.name }}</p>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.general.ORIGINAL_DESC_TITLE')
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    $t('template.details.general.ORGINAL_DESC_DESCRIPTION')
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <p>{{ templateData.dprops.description }}</p>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.general.NUMBER_OF_USES_TITLE')
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    $t('template.details.general.NUMBER_OF_USES_DESCRIPTION')
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
              <p>{{ templateData.dprops.usage_count }}</p>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.general.CREATOR_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <kbd
                >{{ templateData.dprops.creator.username }}#{{
                  templateData.dprops.creator.discriminator
                }}</kbd
              >
            </v-row>
          </v-list-item>
        </v-list>
      </v-list-group>
      <v-list-group
        active-class="white--text"
        no-action
        prepend-icon="mdi-forum"
      >
        <template v-slot:activator>
          <v-list-item-title>{{
            $t('template.details.source.TITLE')
          }}</v-list-item-title>
        </template>
        <v-list dense>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.NAME_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{ templateData.dprops.serialized_source_guild.name }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.GUILD_ID_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <kbd>{{ templateData.dprops.source_guild_id }}</kbd>
            </v-row>
          </v-list-item>
          <v-list-item
            v-if="templateData.dprops.serialized_source_guild.description"
          >
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.DESC_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{ templateData.dprops.serialized_source_guild.description }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.REGION_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <kbd>{{
                templateData.dprops.serialized_source_guild.region
              }}</kbd>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.VERIFICATION_LVL_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{
                  templateData.dprops.serialized_source_guild.verification_level
                }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.DEFAULT_NOTIFS_MSG_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{
                  templateData.dprops.serialized_source_guild
                    .default_message_notifications
                }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.EXPLICIT_CONTENT_FILTER_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{
                  templateData.dprops.serialized_source_guild
                    .explicit_content_filter
                }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.PREFERRED_LOCALE_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <kbd>{{
                templateData.dprops.serialized_source_guild.preferred_locale
              }}</kbd>
            </v-row>
          </v-list-item>
          <v-list-item>
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.AFK_TIMEOUT_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{ templateData.dprops.serialized_source_guild.afk_timeout }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item
            v-if="templateData.dprops.serialized_source_guild.afk_channel_id"
          >
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.AFK_CHNL_ID_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{ templateData.dprops.serialized_source_guild.afk_channel_id }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item
            v-if="templateData.dprops.serialized_source_guild.system_channel_id"
          >
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.SYS_CHNL_ID_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{
                  templateData.dprops.serialized_source_guild.system_channel_id
                }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item
            v-if="
              templateData.dprops.serialized_source_guild.system_channel_flags
            "
          >
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.SYS_CHNL_FLAGS_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <p>
                {{
                  templateData.dprops.serialized_source_guild
                    .system_channel_flags
                }}
              </p>
            </v-row>
          </v-list-item>
          <v-list-item
            v-if="templateData.dprops.serialized_source_guild.icon_hash"
          >
            <v-row no-gutters align="center">
              <v-col>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('template.details.source.ICON_HASH_TITLE')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <kbd>{{
                templateData.dprops.serialized_source_guild.icon_hash
              }}</kbd>
            </v-row>
          </v-list-item>
        </v-list>
      </v-list-group>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    templateData: {
      type: Object,
      required: true,
    },
  },
}
</script>
