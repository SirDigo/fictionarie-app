require 'faker'

puts "Destroying seed data..."

User.destroy_all
Post.destroy_all
Prompt.destroy_all
Comment.destroy_all

puts "Building seed data..."

5.times{User.create!({username: Faker::Internet.username, password_digest: Faker::Internet.password, email: Faker::Internet.email})}

Prompt.create!(day_title: "2122022", body: Faker::Lorem.paragraph)
Prompt.create!(day_title: "322022", body: "How many times does this world take me on the path pof dark and lifht to infinate.")
Prompt.create!(day_title: "332022", body: Faker::Lorem.paragraph)

10.times{Post.create!({title: Faker::Movie.title, body: Faker::Lorem.paragraphs, user_id: User.all.sample.id, prompt_id: Prompt.all.sample.id})}

60.times{Comment.create!({body: Faker::Lorem.sentence, user_id: User.all.sample.id, post_id: Post.all.sample.id})}

puts "Finished building"