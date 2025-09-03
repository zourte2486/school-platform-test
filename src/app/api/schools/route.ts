import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// GET: Fetch all schools
export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM schools ORDER BY created_at DESC');
    connection.release();
    
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

// POST: Add new school
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageFile = formData.get('image') as File;

    // Validation
    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Handle image upload
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create schoolImages directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'schoolImages');
    await mkdir(uploadDir, { recursive: true });
    
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}_${imageFile.name}`;
    const filepath = join(uploadDir, filename);
    
    // Save image
    await writeFile(filepath, buffer);
    
    // Save to database
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, parseInt(contact), filename, email_id]
    );
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'School added successfully',
      data: { id: (result as { insertId: number }).insertId, image: filename }
    });
    
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add school' },
      { status: 500 }
    );
  }
}
