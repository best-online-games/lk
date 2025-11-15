namespace $.$$ {
	// Avatar upload button bound to CRUS profile Photos collection.
	export class $bog_lk_avatar extends $.$bog_lk_avatar {
		protected avatar_log(event: string, detail: Record<string, unknown> = {}) {
			const payload = JSON.stringify(detail, null, 2)
			this.$.$mol_dom_context.console?.info?.(`[LK Avatar] ${event}`, payload)
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
		private_photo_base64() {
			const entity = this.entity()
			if (!entity) return null
			const photos = entity.PhotosBase64()?.remote_list() ?? []
			if (photos.length) {
				this.avatar_log('Photos fetched (base64)', {
					profile: entity.ref().description,
					count: photos.length,
				})
			}
			return photos[0] ?? null
		}

		@$mol_mem
		private_photo_binary() {
			const entity = this.entity()
			if (!entity) {
				this.avatar_log('No entity for avatar')
				return null
			}
			const photos = entity.Photos()?.remote_list() ?? []
			if (photos.length) {
				this.avatar_log('Photos fetched (legacy)', {
					profile: entity.ref().description,
					count: photos.length,
				})
			}
			return photos[0] ?? null
		}

		protected encode_base64(buffer: Uint8Array) {
			const chunk = 0x8000
			let binary = ''
			for (let i = 0; i < buffer.length; i += chunk) {
				const slice = buffer.subarray(i, i + chunk)
				binary += String.fromCharCode(...slice)
			}
			return this.$.$mol_dom_context.btoa(binary)
		}

		@$mol_mem
		image_data() {
			const base64 = this.private_photo_base64()
			if (base64) {
				const data = base64.val() ?? ''
				this.avatar_log('Photo data (base64) loaded', {
					ref: base64.ref().description,
					bytes: data.length * 3 / 4,
					has_data: Boolean(data),
				})
				return data || null
			}

			const legacy = this.private_photo_binary()
			if (!legacy) {
				this.avatar_log('Photo record missing')
				return null
			}
			try {
				const bytes = legacy.val()
				const data = bytes ? this.encode_base64(bytes) : ''
				this.avatar_log('Photo data converted from legacy', {
					ref: legacy.ref().description,
					bytes: bytes?.byteLength ?? 0,
					has_data: Boolean(data),
				})
				return data || null
			} catch (error: any) {
				this.avatar_log('Photo data failed', {
					ref: legacy.ref().description,
					error: error?.message ?? String(error),
				})
				return null
			}
		}

		@$mol_mem
		image_uri() {
			const data = this.image_data()
			if (!data) {
				this.avatar_log('No binary data to render')
				return ''
			}
			this.avatar_log('Image URI rendered', {
				bytes: data.length * 3 / 4,
			})
			return `data:image/*;base64,${data}`
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
			if (!profile) return
			const base64 = this.private_photo_base64()
			if (base64) profile.PhotosBase64(null)!.has(base64.ref(), false)
			const legacy = this.private_photo_binary()
			if (legacy) profile.Photos(null)!.has(legacy.ref(), false)
		}

		@$mol_action
		files(next?: readonly File[]) {
			if (!this.enabled()) return []
			if (!next?.length) return []

			const profile = this.entity()!
			const base64_list = profile.PhotosBase64(null)!
			const base64_current = profile.PhotosBase64()?.remote_list() ?? []
			for (const photo of base64_current) base64_list.has(photo.ref(), false)
			const legacy_current = profile.Photos()?.remote_list() ?? []
			for (const photo of legacy_current) profile.Photos(null)!.has(photo.ref(), false)

			const file = next[0]
			const buffer = new Uint8Array(this.$.$mol_wire_sync(file).arrayBuffer())
			const node = base64_list.local_make()
			node.val(this.encode_base64(buffer))

			return []
		}
	}
}
