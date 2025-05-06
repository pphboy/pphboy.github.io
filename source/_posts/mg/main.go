package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"github.com/mozillazg/go-pinyin"
)

func main() {
	// Open SQLite database from parent directory
	dbPath := "./cnblogs_blog_pphboy.20250504183316.db"
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Query blog content
	rows, err := db.Query("SELECT Title, Body, DateAdded, IsMarkdown FROM blog_Content")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Create output directory if not exists
	outputDir := "output"
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Fatal(err)
	}

	// Process each blog post
	for rows.Next() {
		var title, body, dateAdded string
		var isMarkdown int
		if err := rows.Scan(&title, &body, &dateAdded, &isMarkdown); err != nil {
			log.Printf("Error scanning row: %v", err)
			continue
		}

		// Parse date
		t, err := time.Parse("2006-01-02 15:04:05", dateAdded)
		if err != nil {
			log.Printf("Error parsing date %s: %v", dateAdded, err)
			continue
		}

		// Create hexo front matter
		frontMatter := fmt.Sprintf(`---
title: %s
date: %s
---

`, title, t.Format("2006-01-02 15:04:05"))

		// Combine front matter and content
		content := frontMatter + body

		// Create safe filename
		filename := strings.ReplaceAll(title, " ", "-")
		filename = strings.ReplaceAll(filename, "/", "-")
		filename = strings.ReplaceAll(filename, "\\", "-")
		// Convert Chinese characters to pinyin
		pinyin := pinyin.LazyConvert(filename, nil)
		// Remove spaces and join with hyphens
		filename = strings.Join(pinyin, "-")
		// Keep only alphanumeric characters and hyphens
		reg := regexp.MustCompile(`[^a-zA-Z0-9\-]`)
		filename = reg.ReplaceAllString(filename, "")
		// Convert to lowercase
		filename = strings.ToLower(filename)
		filename += ".md"

		// Write to file
		outputPath := filepath.Join(outputDir, filename)
		if err := os.WriteFile(outputPath, []byte(content), 0644); err != nil {
			log.Printf("Error writing file %s: %v", filename, err)
			continue
		}

		fmt.Printf("Created: %s\n", filename)
	}

	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
}
