namespace $.$$ {
	// Avatar upload button bound to CRUS profile Photos collection.
	export class $bog_lk_avatar extends $.$bog_lk_avatar {
		protected avatar_log(event: string, detail: Record<string, unknown> = {}) {
			this.$.$mol_dom_context.console?.info?.('[LK Avatar]', event, detail)
		}

		@$mol_mem
		entity(next?: $bog_lk_profile | null) {
			if (next !== undefined) {
				this.avatar_log('Entity override', {
					ref: next?.ref().description ?? null,
				})
				return next
			}
			const fallback = this.$.$hyoo_crus_glob.home().hall_by($bog_lk_profile, $bog_lk_profile_preset)
			this.avatar_log('Entity fallback', {
				ref: fallback?.ref().description ?? null,
			})
			return fallback
		}

		accept() {
			return 'image/*'
		}

		multiple() {
			return false
		}

		@$mol_mem
		private_photo() {
			const entity = this.entity()
			if (!entity) {
				this.avatar_log('No entity for avatar')
				return null
			}
			const photos = entity.Photos()?.remote_list() ?? []
			this.avatar_log('Photos fetched', {
				profile: entity.ref().description,
				count: photos.length,
			})
			return photos[0] ?? null
		}

		@$mol_mem
		image_data() {
			const photo = this.private_photo()
			if (!photo) {
				this.avatar_log('Photo record missing')
				return null
			}
			const data = photo.val()
			this.avatar_log('Photo data loaded', {
				ref: photo.ref().description,
				bytes: data?.byteLength ?? 0,
				has_data: Boolean(data),
			})
			return data ?? null
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
			if (!data) {
				this.avatar_log('No binary data to render')
				return ''
			}
			this.avatar_log('Image URI rendered', {
				bytes: data.byteLength,
			})
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
