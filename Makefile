.PHONY: update
update:
	rsync -avzhP -e 'ssh' . server-3@192.168.100.9:/home/server-3/Workspaces/ccf.multiweb.id/

.PHONY: rebuild
rebuild:
	docker compose down && docker compose up -d --build