namespace $.$$ {
	new $mol_after_frame(() => {
		$hyoo_crus_yard.masters = ['https://crus.hd4.ru/']
		$hyoo_crus_glob.yard().sync()
	})

	export class $bog_lk extends $.$bog_lk {
		@$mol_mem
		profile() {
			return this.$.$hyoo_crus_glob.home().hall_by($bog_lk_profile, {})
		}

		protected profile_text(
			ensure: (profile: $bog_lk_profile) => $hyoo_crus_text | null,
			next?: string,
		) {
			const profile = this.profile()
			const atom = profile ? ensure(profile) : null
			if (!atom) return ''

			return atom.text(next)
		}

		@$mol_mem
		full_name(next?: string) {
			return this.profile_text(profile => profile.FullName(null), next)
		}

		@$mol_mem
		nickname(next?: string) {
			return this.profile_text(profile => profile.Nickname(null), next)
		}

		@$mol_mem
		bio(next?: string) {
			return this.profile_text(profile => profile.Bio(null), next)
		}

		@$mol_mem
		city(next?: string) {
			return this.profile_text(profile => profile.City(null), next)
		}

		@$mol_mem
		country(next?: string) {
			return this.profile_text(profile => profile.Country(null), next)
		}

		@$mol_mem
		website(next?: string) {
			return this.profile_text(profile => profile.Website(null), next)
		}

		@$mol_mem
		email(next?: string) {
			return this.profile_text(profile => profile.Email(null), next)
		}

		@$mol_mem
		telegram(next?: string) {
			return this.profile_text(profile => profile.Telegram(null), next)
		}

		@$mol_mem
		github(next?: string) {
			return this.profile_text(profile => profile.Github(null), next)
		}

		@$mol_mem
		twitter(next?: string) {
			return this.profile_text(profile => profile.Twitter(null), next)
		}

		@$mol_mem
		peer_id() {
			return this.$.$hyoo_crus_glob.home().land().auth().peer()
		}

		@$mol_mem
		display_name_text() {
			return this.full_name().trim() || this.nickname().trim() || '—'
		}

		@$mol_mem
		username_preview_text() {
			const nick = this.nickname().trim().replace(/^@+/, '')
			return nick ? `@${nick}` : ''
		}

		@$mol_mem
		bio_preview_text() {
			const bio = this.bio().trim()
			if (bio.length <= 180) return bio
			return `${bio.slice(0, 177)}...`
		}
	}
}
