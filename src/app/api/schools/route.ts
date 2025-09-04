import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2/promise';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

// GET: Fetch all schools
export async function GET() {
  try {    const connection = await pool.getConnection();
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
  let connection;
  try {
    console.log('Starting POST request to add school');
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageFile = formData.get('image') as File;
    
    console.log('Received form data:', { name, address, city, state, contact, email_id });

    // Validation
    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Image validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid image type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Image size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Handle image upload to Cloudinary
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to Cloudinary
    const uploadResult = await uploadImageToCloudinary(buffer, 'school-platform');
    const imageUrl = uploadResult.secure_url;
    
    // Save to database
    connection = await pool.getConnection();
    console.log('Executing SQL query with values:', [name, address, city, state, contact, imageUrl, email_id]);
    
    const [queryResult] = await connection.execute<ResultSetHeader>(
      'INSERT INTO schools (name, adress, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageUrl, email_id]
    );
    
    console.log('Database insert successful:', queryResult);
    
    return NextResponse.json({ 
      success: true, 
      message: 'School added successfully',
      data: { id: queryResult.insertId, image: imageUrl }
    });
    
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add school: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// DELETE: Delete a school
export async function DELETE(request: NextRequest) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'School ID is required' },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();
    
    // First, get the school data to check if it exists
    const [schoolRows] = await connection.execute(
      'SELECT * FROM schools WHERE id = ?',
      [id]
    );
    
    if (!Array.isArray(schoolRows) || schoolRows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'School not found' },
        { status: 404 }
      );
    }
    
    // Delete the school from database
    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM schools WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete school' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'School deleted successfully' 
    });
    
  } catch (error) {
    console.error('Error deleting school:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete school: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
