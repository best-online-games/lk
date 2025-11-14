namespace $ {
	export class $bog_lk_person extends $hyoo_crus_entity.with({
		Name: $hyoo_crus_text,
		Email: $hyoo_crus_text,
		Bio: $hyoo_crus_text,
		CreatedAt: $hyoo_crus_atom_str,
		Photos: $hyoo_crus_list_ref_to(() => $hyoo_crus_atom_bin),
		Links: $hyoo_crus_list_ref_to(() => $bog_lk_link),
	}) {}
}

