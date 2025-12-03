const db = require('../config/database');
const slugify = require('slugify');

class Writeup {

  // --- REWRITTEN: Safe JSON parsing helper ---
  static safeParseTags(tags) {
    if (!tags) return [];
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // If not valid JSON (e.g., plain string), wrap in array
      return [tags];
    }
  }
  // --- END REWRITE ---

  static async findAll(status = null) {
    let query = 'SELECT * FROM writeups';
    const params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';
    const [rows] = await db.query(query, params);
    console.log(rows);

    // --- REWRITTEN: use safeParseTags ---
    return rows.map(row => ({
      ...row,
      tags: Writeup.safeParseTags(row.tags),
    }));
    // --- END REWRITE ---
  }

  static async findBySlug(slug) {
    const [rows] = await db.query(
      'SELECT * FROM writeups WHERE slug = ?',
      [slug]
    );

    if (rows.length === 0) return null;

    // --- REWRITTEN: use safeParseTags ---
    return {
      ...rows[0],
      tags: Writeup.safeParseTags(rows[0].tags),
    };
    // --- END REWRITE ---
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM writeups WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    // --- REWRITTEN: use safeParseTags ---
    return {
      ...rows[0],
      tags: Writeup.safeParseTags(rows[0].tags),
    };
    // --- END REWRITE ---
  }

  static async create(data, authorId) {
    const slug = slugify(data.title, { lower: true, strict: true });

    // --- REWRITTEN: ensure tags is array before JSON.stringify ---
    const tags = JSON.stringify(Array.isArray(data.tags) ? data.tags : [data.tags].filter(Boolean));
    // --- END REWRITE ---

    const excerpt = data.excerpt || data.content.substring(0, 200) + '...';

    const result = await db.query(
      `INSERT INTO writeups (title, slug, content, excerpt, tags, status, author_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.title, slug, data.content, excerpt, tags, data.status || 'draft', authorId]
    );

    return result.insertId; 
  }

  static async update(id, data) {
    const updates = [];
    const values = [];

    if (data.title) {
      updates.push('title = ?');
      values.push(data.title);
      updates.push('slug = ?');
      values.push(slugify(data.title, { lower: true, strict: true }));
    }

    if (data.content !== undefined) {
      updates.push('content = ?');
      values.push(data.content);
    }

    if (data.excerpt !== undefined) {
      updates.push('excerpt = ?');
      values.push(data.excerpt);
    }

    if (data.tags) {
      // --- REWRITTEN: ensure safe JSON storage ---
      values.push(JSON.stringify(Array.isArray(data.tags) ? data.tags : [data.tags].filter(Boolean)));
      updates.push('tags = ?');
      // --- END REWRITE ---
    }

    if (data.status) {
      updates.push('status = ?');
      values.push(data.status);
    }

    values.push(id);

    const result = await db.query(
      `UPDATE writeups SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM writeups WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async search(query) {
    const searchTerm = `%${query}%`;
    const [rows] = await db.query(
      `SELECT * FROM writeups 
       WHERE (title LIKE ? OR content LIKE ? OR tags LIKE ?) 
       AND status = 'published'
       ORDER BY created_at DESC`,
      [searchTerm, searchTerm, searchTerm]
    );

    // --- REWRITTEN: use safeParseTags ---
    return rows.map(row => ({
      ...row,
      tags: Writeup.safeParseTags(row.tags),
    }));
    // --- END REWRITE ---
  }
}

module.exports = Writeup;
