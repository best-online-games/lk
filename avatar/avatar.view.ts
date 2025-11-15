namespace $.$$ {
	// Avatar upload button bound to CRUS profile Photos collection.
	export class $bog_lk_avatar extends $.$bog_lk_avatar {
		@$mol_mem
		entity() {
			return this.$.$hyoo_crus_glob.home().hall_by($bog_lk_profile, {})
		}

		accept() {
			return 'image/*'
		}

		multiple() {
			return false
		}

		@$mol_mem
		private_photo() {
			return this.entity()?.Photos()?.remote_list()[0] ?? null
		}

		@$mol_mem
		image_data() {
			return this.private_photo()?.val() ?? null
		}

		protected to_data_uri(buffer: Uint8Array) {
			const chunk = 0x8000
			let binary = ''
			for (let i = 0; i < buffer.length; i += chunk) {
				const slice = buffer.subarray(i, i + chunk)
				binary += String.fromCharCode(...slice)
			}
			return `data:image/*;base64,${this.$.$mol_dom_context.btoa(binary)}`
		}

		@$mol_mem
		image_uri() {
			const data = this.image_data()
			if (!data) return ''
			return this.to_data_uri(data)
		}

		sub() {
			const has_photo = !!this.image_data()
			const view = has_photo ? this.Image() : this.Placeholder()
			return [view, this.Native()]
		}

		Image() {
			const $ = this.$
			return $.$mol_image.make({
				title: $mol_const(''),
				uri: () => this.image_uri(),
			})
		}

		Placeholder() {
			const $ = this.$
			return $.$mol_icon_upload.make({})
		}

		@$mol_action
		clear() {
			if (!this.enabled()) return
			const profile = this.entity()
			const photo = this.private_photo()
			if (!profile || !photo) return
			profile.Photos(null)!.has(photo.ref(), false)
		}

		@$mol_action
		files(next?: readonly File[]) {
			if (!this.enabled()) return []
			if (!next?.length) return []

			const profile = this.entity()!
			const list = profile.Photos(null)!
			const current = profile.Photos()?.remote_list() ?? []
			for (const photo of current) list.has(photo.ref(), false)

			const file = next[0]
			const buffer = new Uint8Array(this.$.$mol_wire_sync(file).arrayBuffer())
			const bin = list.remote_make({})!
			bin.val(buffer)

			return []
		}
	}
}
